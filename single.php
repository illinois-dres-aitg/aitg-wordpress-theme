<?php get_header();

$prev_in_category_link = get_previous_post_link( '%link', 'Previous in category', true);
$next_in_category_link = get_next_post_link( '%link', 'Next in category', true);

?>

  <div class="flex-row">
    <div class="left-column">
     </div>
    <div class="mmiddle-column">
      <div class="breadcrumb">
        <!-- @ breadcrumb trail of links indicating location of
             current page in menu structure -->
        <?php echo do_shortcode( '[breadcrumb]' ); ?>
      </div>

      <main class="content">


  <?php while (have_posts()) : the_post();

      get_template_part( 'content',  get_post_format() );
      ?>

      <nav class="current-post-category" aria-label="Current Post Category">
        <span class="prev-post">
          <?php if ($prev_in_category_link) {
            echo  '<< ' . $prev_in_category_link;
          } ?>
        </span>
        <?php if ($prev_in_category_link && $next_in_category_link) {
          echo  '<span class="separator"></span>';
        } ?>
        <span class="next-post">
          <?php if ($next_in_category_link) {
            echo  $next_in_category_link . ' >>';
          } ?>
        </span>
      </nav>


      <?php
      if ( comments_open() || get_comments_number() ) {
        do_action( 'basic_before_post_comments_area' );
        comments_template();
        do_action( 'basic_after_post_comments_area' );
      }

  endwhile; ?>

      </main>
    </div>
    <div class="right-column">
      <?php get_sidebar(); ?>
    </div>
  </div>

<?php get_footer(); ?>
