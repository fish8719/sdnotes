module.exports = function(eleventyConfig) {
  // Pass through static assets (CSS, JS, images, PDFs, etc.)
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  // eleventyConfig.addPassthroughCopy({ "images": "images" });
  // eleventyConfig.addPassthroughCopy({ "docs": "docs" });

  eleventyConfig.addFilter("statusLabel", function(status) {
    const labels = {
      todo: "TODO",
      wip: "Work In Progress",
      partial: "Partially Complete",
      complete: "Complete"
    };
    return labels[status] || status;
  });

  const { DateTime } = require("luxon");

  // Add a date formatting filter
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
  });

  return {
    dir: {
      input: "content",         // Where content pages live
      includes: "../src/includes", // Where partial templates live
      layouts: "../src/layouts", // Where page layouts live
      output: "_site"            // Final built site
    },
    templateFormats: ["md", "njk", "html"], // Supported file types
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
