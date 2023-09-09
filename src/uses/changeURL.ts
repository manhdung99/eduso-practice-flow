function addStaticURLForDescription(Description) {
  if (
    Description != null &&
    Description.includes("src=") &&
    !Description.includes("https") &&
    !Description.includes("http://publisher.edusolution.vn")
  ) {
    Description = Description.replace(/src="/g, 'src="https://static.eduso.vn');
  }
  return Description;
}
function addStaticURLForMedia(media) {
  if (
    media != null &&
    (media.Extension.includes("image") ||
      (media.Extension.includes("audio") &&
        !media.Path.includes("https") &&
        !media.Path.includes("https://publisher.eduso.vn") &&
        !media.Path.includes("http://publisher.edusolution.vn")))
  ) {
    media.Path = "https://static.eduso.vn" + media.Path;
  }
  return media;
}
function updateStaticToPublisher(media) {
  if (media != null && media.Path.includes("https://static.eduso.vn")) {
    media.Path = media.Path.replace(
      "https://static.eduso.vn/",
      "https://publisher.eduso.vn/"
    );
  }
  return media;
}
function updatEdusolutionToEduso(media) {
  if (media != null && media.Path.includes("http://publisher.edusolution.vn")) {
    media.Path = media.Path.replace(
      "http://publisher.edusolution.vn",
      "https://publisher.eduso.vn/"
    );
  }
  return media;
}

export {
  addStaticURLForDescription,
  addStaticURLForMedia,
  updateStaticToPublisher,
  updatEdusolutionToEduso,
};
