<?php get_header(); ?>

  <div class="flex-row">
    <div class="left-column">
    </div>
    <main class="content">
    	<?php do_action( 'basic_main_content_inner_begin' ); ?>

        <?php if ( is_home() && 'customtitle' == get_theme_mod( 'home_h1_type', 'sitetitle' )  ) { ?>
            <div class="blog-home-header">
                <h1><?php echo esc_html( get_theme_mod( 'custom_home_h1', get_bloginfo('sitetitle') ) ); ?></h1>
            </div>
        <?php } ?>

        <?php if (have_posts()) : ?>

            <h1>Blog Posts</h1>
            <div class="category"><?php the_category(); ?></div>

            <?php

        	while (have_posts()) : the_post();

        		get_template_part( 'content' );

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
    <div class="right-column">
      <?php get_sidebar(); ?>
    </div>
  </div>

	<!-- END #content -->

<?php get_footer(); ?>
