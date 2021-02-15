<?php

$no_sidebar = in_array( basic_get_layout(), array('full','center') );

$mob_sidebar = basic_get_theme_option('show_sidebar', false );
$class = ( $mob_sidebar ) ? 'block' : '';
//$class = ( $no_sidebar && is_customize_preview() ) ? $class .' hide' : $class;

$category = single_cat_title( '', false );

$tags = get_the_tags();

?>

<!-- BEGIN #sidebar -->
<aside id="sidebar" class="<?php echo $class; ?>">

    <?php if ( is_active_sidebar( 'sidebar' ) ) :

      if ($category) {
      ?>
      <div>Category: <?php echo $category ?></div>
      <?php } else { ?>
      <div>No Category</div>
      <?php }
      if ($tags) {
      ?>
      <div>Tags: <?php echo count($tags) ?></div>
      <?php } else { ?>
      <div>No Tags</div>
      <?php } ?>

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

