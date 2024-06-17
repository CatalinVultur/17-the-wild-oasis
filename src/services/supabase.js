import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://zqifkmzldfinyjilcxjo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxaWZrbXpsZGZpbnlqaWxjeGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyODM3MTQsImV4cCI6MjAzMzg1OTcxNH0.ddT4aKPHIX9-7MBUW4LWXvgmyopD7Pkq4Pjwrz2vI3k';

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
