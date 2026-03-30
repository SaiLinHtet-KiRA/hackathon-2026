export default async function PostData(path, data) {
  try {
    const res = await fetch(
      "https://hackathon-2026-onj1.onrender.com/" + path,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
  } catch (error) {
    console.log(error);
  }
}
