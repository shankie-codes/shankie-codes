function generatePosts(data) {
  return data
    ? data.documents.map((post) => {
        return {
          pid: post.name.split("/").pop(),
          title: post.fields.title?.stringValue || "",
          subtitle: post.fields.subtitle?.stringValue || "",
          image: post.fields.image?.stringValue || "",
          frontPageOrder: post.fields.frontPageOrder?.integerValue || "",
        };
      })
    : [];
}

export { generatePosts };
