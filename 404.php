<?php get_header(); ?>

  <main class="flex-row">
    <div class="left-column">
    </div>

    <div class="middle-column search-results">
      <nav aria-label="Breadcrumbs">
        <!-- @ breadcrumb trail of links indicating location of
             current page in menu structure -->
        <?php echo do_shortcode( '[breadcrumb]' ); ?>
      </nav>
      <div class="search-form">
        <h1><?php _e( 'Oops! That page can&rsquo;t be found.', 'basic' ); ?></h1>
         <?php get_search_form(); ?>
      </div>
    </div>
    <div class="right-column">
    </div>
  </main>
	<!-- END #content -->

<?php get_footer(); ?>
