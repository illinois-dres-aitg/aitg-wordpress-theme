<?php get_header(); ?>

  <div class="flex-row">
    <div class="left-column">
      <p>Test single.php</p>
     </div>
    <main class="content">


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

    </main>
    <div class="right-column">
      <?php get_template_part( 'single-sidebar' ); ?>
    </div>
  </div>

<?php get_footer(); ?>
