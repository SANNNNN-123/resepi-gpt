// app/api/search/route.ts
import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

async function getEmbedding(ingredients: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: ingredients,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error getting embedding:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json();
    
    if (!ingredients) {
      return NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      );
    }

    // Get embedding for the ingredients
    const queryEmbedding = await getEmbedding(ingredients);

    // First get the matching recipe_ids and main_ingredients from recipe_embeddings
    const { data: matchingEmbeddings, error: embeddingsError } = await supabase.rpc(
      'match_recipes_by_ingredients',
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 5
      }
    );

    if (embeddingsError) {
      throw embeddingsError;
    }

    if (!matchingEmbeddings || matchingEmbeddings.length === 0) {
      return NextResponse.json({ recipes: [] });
    }

    // Get the recipe_ids from the matching embeddings
    const recipeIds = matchingEmbeddings.map((match: any) => match.recipe_id);

    // Fetch the full recipe details
    const { data: recipes, error: recipesError } = await supabase
      .from('recipes')
      .select(`
        *,
        recipe_embeddings!inner (
          main_ingredients
        )
      `)
      .in('id', recipeIds);

    if (recipesError) {
      throw recipesError;
    }

    // Combine the similarity scores with the recipe details
    const recipesWithSimilarity = recipes?.map((recipe) => {
      const matchingEmbedding = matchingEmbeddings.find(
        (match: any) => match.recipe_id === recipe.id
      );
      return {
        ...recipe,
        main_ingredients: recipe.recipe_embeddings?.main_ingredients || [],
        similarity: matchingEmbedding?.similarity || 0
      };
    });

    return NextResponse.json({ 
      recipes: recipesWithSimilarity 
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search recipes' },
      { status: 500 }
    );
  }
}