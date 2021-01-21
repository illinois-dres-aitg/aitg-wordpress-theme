<?php get_header(); ?>

  <main class="flex-row">
    <div class="left-column">
    </div>
    <div class="content">


	<?php while (have_posts()) : the_post(); ?>

	   <h1><?php the_title(); ?></h1>

    <?php

        the_content();

		get_template_part( 'content',  get_post_format() );


			if ( comments_open() || get_comments_number() ) {
				do_action( 'basic_before_post_comments_area' );
				comments_template();
				do_action( 'basic_after_post_comments_area' );
			}

	endwhile; ?>

    </div>
    <div class="right-column">
	<?php get_sidebar(); ?>
    </div>
  </main>

<?php get_footer(); ?>
