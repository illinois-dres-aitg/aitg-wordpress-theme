<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h2 class="entry-title">
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?> Summary
      </a>
    </h2>

    <div class="date">
        <?php the_date(); ?>
    </div>

    <div class="author">
        <?php the_author(); ?>
    </div>

    <div class="categories">
        <?php the_category(); ?>
    </div>

    <div class="tags">
        <?php the_tags(); ?>
    </div>

    <?php the_excerpt(); ?>
</article>
