<?php get_header();

$no_prev_in_category_link = '<span class="no-link">Previous in Category</span>';
$no_next_in_category_link = '<span class="no-link">Next in Category</span>';

$prev_in_category_link = get_previous_post_link( '%link', 'Previous in category', true);
$next_in_category_link = get_next_post_link( '%link', 'Next in category', true);

?>

  <div class="flex-row">
    <div class="left-column">
     </div>
    <main class="content">


  <?php while (have_posts()) : the_post(); ?>

     <h1><?php the_title(); ?></h1>

    <?php

      the_content();

      get_template_part( 'content',  get_post_format() );

    ?>
      <nav aria-label="Current Post Category">
        <div class="prev-post">
          <?php if ($prev_in_category_link) {
            echo  $prev_in_category_link;
          } else {
            echo  $no_prev_in_category_link;
          } ?>
        </div>
        <div class="next-post">
          <?php if ($next_in_category_link) {
            echo  $next_in_category_link;
          } else {
            echo  $no_next_in_category_link;
          } ?>
        </div>
      </nav>

    <?php
      if ( comments_open() || get_comments_number() ) {
        do_action( 'basic_before_post_comments_area' );
        comments_template();
        do_action( 'basic_after_post_comments_area' );
      }

  endwhile; ?>

    </main>
    <div class="right-column">
      <?php get_sidebar(); ?>
    </div>
  </div>

<?php get_footer(); ?>
