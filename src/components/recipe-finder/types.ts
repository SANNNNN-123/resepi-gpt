export interface Recipe {
  id: string
  title: string
  similarity: number
  main_ingredients: string[]
  recipe_url: string
  preparation_time: string
  cooking_time: string
  total_time: string
  servings: string
  ingredients: string[]
  instructions: string[]
  tips: string
  image_url: string
  created_at: string
} 