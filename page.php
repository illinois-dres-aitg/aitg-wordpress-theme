<?php get_header(); ?>
  <div class="flex-row">
    <div class="left-column">
    </div>
    <div class="middle-column">
      <nav aria-label="Breadcrumbs">
        <!-- @ breadcrumb trail of links indicating location of
             current page in menu structure -->
        <?php echo do_shortcode( '[breadcrumb]' ); ?>
      </nav>

      <main class="content">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php do_action( 'basic_before_page_article' ); ?>
				<article class="post page" id="pageid-<?php the_ID(); ?>">

					<?php do_action( 'basic_before_page_title' );  ?>
					<h1><?php the_title(); ?></h1>
					<?php do_action( 'basic_after_page_title' );  ?>

					<?php do_action( 'basic_before_page_content_box' );  ?>
					<div class="entry-box clearfix">
						<?php do_action( 'basic_before_page_content' );  ?>
						<?php the_content(); ?>
						<?php do_action( 'basic_after_page_content' );  ?>
					</div>
					<?php do_action( 'basic_after_page_content_box' );  ?>

				</article>
				<?php do_action( 'basic_after_page_article' ); ?>


				<?php

				if ( comments_open() || get_comments_number() ) {
					do_action( 'basic_before_page_comments_area' );
					comments_template();
					do_action( 'basic_after_page_comments_area' );
				}

			endwhile; ?>
	    </main>
	  </div>
    <div class="right-column">
    </div>
  </div>

	<!-- END #content -->

<?php get_footer(); ?>
