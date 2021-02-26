<?php get_header(); ?>

  <div class="flex-row">
    <div class="left-column">
    </div>
    <main class="content">
    	<?php do_action( 'basic_main_content_inner_begin' ); ?>

            <div class="blog-home-header">
                <h1>Blog Tags</h1>
            </div>

        <?php if (have_posts()) : ?>

            <ul>
                <?php
                $tags = get_tags();
                if ( $tags ) :
                    foreach ( $tags as $tag ) : ?>
                        <li><a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" title="<?php echo esc_attr( $tag->name ); ?>"><?php echo esc_html( $tag->name ); ?></a></li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>

        <?php else: ?>

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
