const BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const TABLE = 'Creators'   // must match your exact table name in Supabase

const defaultHeaders = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

/** Read all creators */
export async function listCreators() {
  const res = await fetch(`${BASE_URL}/${TABLE}?select=*&order=Name.asc`, {
    headers: defaultHeaders,
  })
  if (!res.ok) throw new Error('Failed to fetch creators')
  return res.json()
}

/** Read single creator by name */
export async function getCreator(Name) {
  const res = await fetch(`${BASE_URL}/${TABLE}?Name=eq.${encodeURIComponent(Name)}&select=*`, {
    headers: defaultHeaders,
  })
  if (!res.ok) throw new Error('Failed to fetch creator')
  const rows = await res.json()
  return rows[0] || null
}

/** Create */
export async function createCreator(payload) {
  const res = await fetch(`${BASE_URL}/${TABLE}`, {
    method: 'POST',
    headers: { ...defaultHeaders, Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create creator')
  const rows = await res.json()
  return rows[0]
}

/** Update by name */
export async function updateCreator(Name, payload) {
  const res = await fetch(`${BASE_URL}/${TABLE}?Name=eq.${encodeURIComponent(Name)}`, {
    method: 'PATCH',
    headers: { ...defaultHeaders, Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update creator')
  const rows = await res.json()
  return rows[0]
}

/** Delete by name */
export async function deleteCreator(Name) {
  const res = await fetch(`${BASE_URL}/${TABLE}?Name=eq.${encodeURIComponent(Name)}`, {
    method: 'DELETE',
    headers: { ...defaultHeaders, Prefer: 'return=representation' },
  })
  if (!res.ok) throw new Error('Failed to delete creator')
  return true
}
