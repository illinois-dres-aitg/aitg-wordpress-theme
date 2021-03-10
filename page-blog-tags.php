<?php get_header();
/*
Template Name: Blog Tags
Template Post Type: page
*/

class BlogTags {

    private function list_of_tags($tags) {
        $html = '  <ul class="post_tags">';
        foreach ( $tags as $tag ) {
            if ($tag->count > 0) {
                $tag_link = get_tag_link( $tag->term_id );

                $html .= "  <li><a href='{$tag_link}' class='{$tag->slug}'>";
                $html .= "{$tag->name} ({$tag->count} posts)</a></li>";
            }
        }
        $html .= '  </ul>';
        return $html;
    }

    public function show_tags() {
        $html = '<div class="post_tags">';

        $tags = get_tags(array(
            'taxonomy' => 'post_tag',
            'orderby' => 'count'));

        $html .= '  <h2 class="post_tags">Tags by Popularity</h2>';

        $html .= $this->list_of_tags($tags);

        $tags = get_tags(array(
            'taxonomy' => 'post_tag',
            'orderby' => 'name',
            'order'   => 'DESC'));

        $html .= '  <h2 class="post_tags">Tags by Name</h2>';

        $html .= $this->list_of_tags($tags);

        $html .= '</div>';
        echo $html;
    }

}

$blog_tags = new BlogTags();

?>

  <div class="flex-row">
    <div class="left-column">
    </div>
    <main class="content">
    	<?php do_action( 'basic_main_content_inner_begin' ); ?>

        <h1><?php the_title(); ?></h1>

        <?php $blog_tags->show_tags(); ?>

    	<?php do_action( 'basic_main_content_inner_end' ); ?>
    </main>
    <div class="right-column">
      <?php get_sidebar(); ?>
    </div>
  </div>

	<!-- END #content -->

<?php get_footer(); ?>
