// pages/api/search.js
import { supabase } from '../../supabaseClient';

export default async function handler(req, res) {
  const { query, category } = req.body;

  // Modify this query to fit your database schema
  let searchQuery = supabase
    .from('properties') // Replace 'properties' with your actual table name
    .select('*')
    .ilike('location', `%${query}%`); // Search for location

  if (category) {
    searchQuery = searchQuery.eq('category', category); // Add category filtering if provided
  }

  const { data, error } = await searchQuery;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ properties: data });
}
