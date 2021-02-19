<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h2 class="entry-title">
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
    </h2>

    <div class="date">
        <span>Date:</span> <?php echo get_the_date(); ?>
    </div>

    <div class="author">
        <span>Author: </span> <?php the_author(); ?>
    </div>

    <div class="categories">
        <span>Category:</span> <?php the_category(', '); ?>
    </div>

    <div class="tags">
        <?php the_tags(); ?>
    </div>

    <?php the_excerpt(); ?>
</article>
