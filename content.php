<h1>Blog Posts</h1>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h2 class="entry-title">
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
  </h2>

    <?php the_excerpt(); ?>
</article>
