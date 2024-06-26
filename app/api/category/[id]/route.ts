import { getCategoryById } from "@/lib/actions/get-actions";

export async function GET(req: any, res: any) {
  const { id } = req.query;
  try {
    const category = await getCategoryById(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch category' });
  }
}