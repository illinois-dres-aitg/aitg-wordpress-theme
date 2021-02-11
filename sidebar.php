<?php

$no_sidebar = in_array( basic_get_layout(), array('full','center') );

$mob_sidebar = basic_get_theme_option('show_sidebar', false );
$class = ( $mob_sidebar ) ? 'block' : '';
//$class = ( $no_sidebar && is_customize_preview() ) ? $class .' hide' : $class;

?>

<!-- BEGIN #sidebar -->
<aside id="sidebar" class="<?php echo $class; ?>">
	<ul id="widgetlist">

    <?php if ( is_active_sidebar( 'sidebar' ) ) :

      ?>
      <div class="posts">
        <h2>Latest Posts</h2>
        <ul>
      <?php

        $postslist = get_posts( array(
            'posts_per_page' => 10,
            'order'          => 'ASC',
            'orderby'        => 'title'
        ) );

        if ( $postslist ) {
            foreach ( $postslist as $post ) :
              setup_postdata( $post );
      ?>
              <li>
                <a href="<?php the_permalink(); ?>">
                  <?php the_title(); ?>
                </a>
              </li>
      <?php
            endforeach;
            wp_reset_postdata();
        }
      ?>
        </ul>
      </div>

      <div class="categories">
        <h2>Categories</h2>
        <ul>
        <?php
          $categories = get_categories( array(
              'orderby' => 'name',
              'order'   => 'ASC'
          ) );

          foreach ( $categories as $category ) {
            printf( '<li><a href="%1$s">%2$s</a> <span class="count" title="Number of posts">(%3$s)</span></li>',
              esc_url( get_category_link( $category->term_id ) ),
              esc_html( $category->name ),
              esc_html( $category->count )
            );
          }
        ?>
        </ul>
      </div>
    <?php

//        dynamic_sidebar( 'sidebar' );
    else : ?>

		<li class="widget widget_search">
			<?php get_search_form(); ?>
		</li>

		<?php wp_list_categories('use_desc_for_title=0&title_li=<p class="wtitle">'. __("Categories", 'basic') .'</p>');  ?>

	<?php endif; ?>

	</ul>
</aside>
<!-- END #sidebar -->

