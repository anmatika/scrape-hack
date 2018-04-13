const scrapeIt = require("scrape-it");

// Promise interface
module.exports = {
  scrape: function() {
    return new Promise(resolve => {
      scrapeIt("https://ionicabizau.net", {
        title: ".header h1",
        desc: ".header h2",
        avatar: {
          selector: ".header img",
          attr: "src",
        },
      }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`);
        console.log(data);
        resolve(data);
      });
    });
  },
  scrape2: function() {
    // Callback interface
    scrapeIt(
      "https://ionicabizau.net",
      {
        // Fetch the articles
        articles: {
          listItem: ".article",
          data: {
            // Get the article date and convert it into a Date object
            createdAt: {
              selector: ".date",
              convert: x => new Date(x),
            },

            // Get the title
            title: "a.article-title",

            // Nested list
            tags: {
              listItem: ".tags > span",
            },

            // Get the content
            /*  content: {
          selector: ".article-content",
          how: "html",
        }, */

            // Get attribute value of root listItem by omitting the selector
            classes: {
              attr: "class",
            },
          },
        },

        // Fetch the blog pages
        pages: {
          listItem: "li.page",
          name: "pages",
          data: {
            title: "a",
            url: {
              selector: "a",
              attr: "href",
            },
          },
        },

        // Fetch some other data from the page
        title: ".header h1",
        desc: ".header h2",
        avatar: {
          selector: ".header img",
          attr: "src",
        },
      },
      (err, { data }) => {
        console.log(err || data);
      },
    );
  },
};
