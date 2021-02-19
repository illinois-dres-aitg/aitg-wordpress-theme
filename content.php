<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h1 class="entry-title">
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
    </h1>

    <div class="date">
        Date: <?php the_date(); ?>
    </div>

    <div class="author">
        Author: <?php the_author(); ?>
    </div>

    <?php the_content(); ?>

    <div class="categories">
        Category: <?php the_category(', '); ?>
    </div>

    <div class="tags">
        <?php the_tags(); ?>
    </div>
</article>
