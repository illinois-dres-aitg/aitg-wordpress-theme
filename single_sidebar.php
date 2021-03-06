<?php

$category = single_cat_title( '', false );

$no_prev_link = '<span class="no-link">Previous</span>';
$no_next_link = '<span class="no-link">Next</span>';

$no_prev_in_category_link = '<span class="no-link">Previous in Category</span>';
$no_next_in_category_link = '<span class="no-link">Next in Category</span>';

$prev_link = get_previous_post_link('%link', 'Previous');
$next_link = get_next_post_link('%link', 'Next');

$prev_in_category_link = get_previous_post_link( '%link', 'Previous in category', true);
$next_in_category_link = get_next_post_link( '%link', 'Next in category', true);

?>

<!-- BEGIN #sidebar -->
<aside id="sidebar" class="<?php echo $class; ?>">

    <?php if ( is_active_sidebar( 'sidebar' ) ) :

      if ($category) {
      ?>
      <div>Category: <?php echo $category ?></div>
      <?php } else { ?>
      <div>No Category</div>
      <?php } ?>

      <nav aria-label="Previous and Next Posts">
        <?php if ( $category ) { ?>
          <div class="prev-post">
            <?php if ($prev_in_category_link) {
              echo  $prev_in_category_link;
            } else {
              echo  $no_prev_in_category_link;
            }
            ?>
          </div>
          <div class="next-post">
            <?php if ($next_in_category_link) {
              echo  $next_in_category_link;
            } else {
              echo  $no_next_in_category_link;
            }
            ?>
          </div>
        <?php } else { ?>
          <div class="prev-post">
            <?php if ($prev_link) {
              echo $prev_link;
            } else {
              echo $no_prev_link;
            }
            ?>
          </div>
          <div class="next-post">
            <?php if ($next_link) {
              echo  $next_link;
            } else {
              echo  $no_next_link;
            }
            ?>
          </div>
        <?php } ?>
      </nav>

      <nav aria-labelledby="id-latest-posts">
        <h2 id="id-latest-posts">Latest Posts</h2>
        <ul class="latest-posts">
      <?php

        $postslist = get_posts( array(
            'posts_per_page' => 10,
            'order'          => 'ASC',
            'orderby'        => 'title'
        ) );

        if ( $postslist ) {
            foreach ( $postslist as $post ) {
              setup_postdata( $post );
      ?>
              <li class="recent-posts">
                <a href="<?php the_permalink(); ?>">
                  <?php the_title(); ?>
                </a>
              </li>
      <?php
            }
            wp_reset_postdata();
        }
      ?>
        </ul>

        <div class="all-posts"><a href="/blog/">Index of all posts</a></div>
      </nav>

      <nav aria-labelledby="id-categories">
        <h2 id="id-categories">Categories</h2>
        <ul class="categories">
        <?php
          $categories = get_categories( array(
              'orderby' => 'name',
              'order'   => 'ASC'
          ) );

          foreach ( $categories as $category ) {
            printf( '<li><a href="%1$s" title="%2$s posts">%3$s</a> <span class="count" >(%4$s)</span></li>',
              esc_url( get_category_link( $category->term_id ) ),
              esc_html( $category->count ),
              esc_html( $category->name ),
              esc_html( $category->count )
            );
          }
        ?>
        </ul>
      </nav>
    <?php

//        dynamic_sidebar( 'sidebar' );
    else : ?>

		<div class="widget widget_search">
			<?php get_search_form(); ?>
		</div>

		<?php wp_list_categories('use_desc_for_title=0&title_li=<p class="wtitle">'. __("Categories", 'basic') .'</p>');  ?>

	<?php endif; ?>

</aside>
<!-- END #sidebar -->

