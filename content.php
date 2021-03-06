<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h1 class="entry-title">
      <?php the_title(); ?>
    </h1>

    <div class="date">
        <span>Date:</span> <?php the_date(); ?>
    </div>

    <div class="author">
        <span>Author:</span> <?php the_author(); ?>
    </div>

    <?php the_content(); ?>

    <div class="categories">
        <span>Category:</span> <?php the_category(', '); ?>
    </div>

    <div class="tags">
        <?php the_tags() ?>
    </div>
</article>
