<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h2 class="entry-title">
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
    </h2>

    <div class="date">
        <?php the_date(); ?>
    </div>

    <div class="author">
        <?php the_author(); ?>
    </div>

    <?php the_excerpt(); ?>
</article>
