// app/api/search/route.ts
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function getEmbedding(ingredients: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: ingredients
    })
    return response.data[0].embedding
  } catch (error) {
    console.error('Error getting embedding:', error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const { ingredients, limit = 5, similarity_threshold = 0.5 } = await request.json()

    if (!ingredients) {
      return NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      )
    }

    // Get embedding for the ingredients
    const queryEmbedding = await getEmbedding(ingredients)

    // Search for similar recipes using the HNSW index
    const { data: recipes, error } = await supabase.rpc(
      'match_recipes_by_ingredients',
      {
        query_embedding: queryEmbedding,
        match_threshold: similarity_threshold,
        match_count: limit
      }
    )

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json(
        { error: 'Failed to search recipes' },
        { status: 500 }
      )
    }

    // Transform and return the results
    const formattedRecipes = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      main_ingredients: recipe.main_ingredients,
      similarity: recipe.similarity,
      image_url: recipe.image_url,
      cooking_time: recipe.cooking_time,
      difficulty: recipe.difficulty
    }))

    return NextResponse.json({
      recipes: formattedRecipes
    })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}