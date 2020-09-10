<?php get_header(); ?>
  <main class="flex-row">
    <div class="left-column">
    </div>

    <div class="middle-column search-results">
<?php if (have_posts()) : ?>
	<div class="search-form">
        <h1><?php _e( 'Search results for', 'basic' ); ?> &laquo;<?php the_search_query() ?>&raquo;</h1>
		    <?php get_search_form(); ?>
	</div>
	<?php while (have_posts()) : the_post(); ?>

	<div <?php post_class(); ?> id="postid-<?php the_ID(); ?>">
		<h2><a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
		<div class="entry clearfix"><?php the_excerpt(); ?></div>
	</div>

	<?php endwhile; ?>

	<?php the_posts_pagination( apply_filters( 'basic_search_posts_pagination_args', array(
		'mid_size' => 2,
		'prev_text' => __( '&laquo; Prev', 'basic'),
		'next_text' => __( 'Next &raquo;', 'basic'),
	) ) );
	?>

<?php else : ?>
	<div class="search-results">
    	<h1><?php _e( 'No results for ', 'basic' ); ?> &laquo;<?php the_search_query() ?>&raquo;</h1>
    	<?php get_search_form(); ?>
    </div>
<?php endif; ?>

    </div>
    <div class="right-column">
    </div>
  </main>

	<!-- END #content -->

<?php get_footer(); ?>