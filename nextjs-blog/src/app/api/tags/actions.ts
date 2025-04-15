export async function addTag(name: string) {
  const res = await fetch(`/api/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (res.ok) {
    return { success: true, message: "添加成功" };
  } else {
    return { success: false, message: "添加失败" };
  }
}
