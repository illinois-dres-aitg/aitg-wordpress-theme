<?php get_header(); ?>

  <div class="flex-row">
    <div class="left-column">
    </div>
    <div class="middle-column">
      <div class="breadcrumb">
        <nav aria-label="Breadcrumbs">
            <!-- @ breadcrumb trail of links indicating location of
             current page in menu structure -->
          <?php echo do_shortcode( '[breadcrumb]' ); ?>
        </nav>
        <script>
            window.addEventListener('load', function() {
                let aNode = document.querySelector('.breadcrumb-container a[title="Blog"]');
                aNode.href += '/blog/';
            });
        </script>

      </div>

      <main class="content">
        	<?php do_action( 'basic_main_content_inner_begin' ); ?>

            <?php if ( is_home() && 'customtitle' == get_theme_mod( 'home_h1_type', 'sitetitle' )  ) { ?>
                <div class="blog-home-header">
                    <h1><?php echo esc_html( get_theme_mod( 'custom_home_h1', get_bloginfo('sitetitle') ) ); ?></h1>
                </div>
            <?php } ?>

            <?php if (have_posts()) : ?>


                <?php
                    $category = single_cat_title( '', false );
                    if ($category) {?>
                    <h1><?php echo $category ?> Blog Posts</h1>
                <?php } else { ?>
                    <h1>All Blog Posts</h1>
                <?php } ?>

                <?php

            	while (have_posts()) : the_post();

            		get_template_part( 'content-summary' );

            	endwhile; ?>

            	<?php

            	the_posts_pagination( apply_filters( 'basic_posts_pagination_args', array(
            		'mid_size' => 2,
            		'prev_text' => __( '&laquo; Prev', 'basic'),
            		'next_text' => __( 'Next &raquo;', 'basic'),
            	) ) );


            else: ?>

            	<div class="post clearfix">
            	    <h2><?php _e( 'Posts not found', 'basic' ); ?></h2>
            	    <?php get_search_form(); ?>
            	</div>

            <?php endif; ?>

        	<?php do_action( 'basic_main_content_inner_end' ); ?>
        </main>
    </div>
    <div class="right-column">
      <?php get_sidebar(); ?>
    </div>
  </div>

	<!-- END #content -->

<?php get_footer(); ?>
