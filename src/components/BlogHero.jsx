import React from "react";

export default function BlogHero() {
  return (
    <div className="container">
      <div className="hero-v2">
        {/* Category */}
        <div className="hero__taxonomies">
          <a
            href="#"
            className="sf-tag topic topic--marketing sf-tag--marketing"
            aria-label="Filed under Marketing"
          >
            Marketing
          </a>
        </div>

        {/* Title */}
        <h1 className="h2">
          What is Affiliate Marketing and How to Get Started?
        </h1>

        {/* Images */}
        <div className="hero-v2__ornaments-container">
          <figure className="hero-v2__image">
            <span className="img-object-fit">
              <img
                src="https://www.salesforce.com/in/blog/wp-content/uploads/sites/9/2024/11/blog-affiliate-marketing.jpg?w=300"
                alt="Affiliate Marketing"
                loading="eager"
              />
            </span>
          </figure>

          <div className="hero-v2__background">
            <img
              src="https://www.salesforce.com/in/blog/wp-content/themes/salesforce-blog/dist/images/hero-legacy-back.png"
              alt=""
              loading="eager"
            />
          </div>

          <div className="hero-v2__foreground">
            <img
              src="https://www.salesforce.com/in/blog/wp-content/themes/salesforce-blog/dist/images/hero-legacy-front.png"
              alt=""
              loading="eager"
            />
          </div>
        </div>

        {/* Excerpt */}
        <h2 className="hero-v2__excerpt">
          Affiliate marketing involves promoting another business’s products or
          services online in return for a small affiliate commission after each
          sale. Learn more.
        </h2>

        {/* Author */}
        <article className="hero-byline hero-byline--1">
          <div className="hero-byline__author">
            <div className="hero-byline__thumbnail">
              <img
                src="https://www.salesforce.com/in/blog/wp-content/uploads/sites/9/2023/09/salesforce-avatar-e1666571807979.webp?w=150"
                alt="Salesforce"
              />
            </div>

            <div className="hero-byline__contents">
              <h3 className="hero-byline__full-name">
                Salesforce <span>Staff</span>
              </h3>

              <div className="hero-byline__meta">
                <time dateTime="2024-11-13">November 13, 2024</time>
                <span className="hero-byline__reading-time">
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
