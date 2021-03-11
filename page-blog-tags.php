<?php get_header();
/*
Template Name: Blog Tags
Template Post Type: page
*/

class AITG_BlogTags {

    private function list_of_tags_by_name() {
        $tags = get_tags(array(
            'taxonomy' => 'post_tag',
            'orderby' => 'name'));

        $lastLetter = '';

        $html = '';

        foreach ( $tags as $tag ) {
            $letter = $tag->name[0];
            if ($lastLetter !== $letter) {
                if ($lastLetter !== '') {
                    $html .= "  </ul>";
                }
                $html .= "  <h3 class='post-letter'>ucfirst{$letter}</h3>";
                $html .= "  <ul class='post-tags'>";
            }
            if ($tag->count > 0) {
                $tag_link = get_tag_link( $tag->term_id );

                $html .= "  <li><a href='{$tag_link}' class='{$tag->slug}'>";
                $html .= "{$tag->name} ({$tag->count} posts)</a></li>";
            }
        }

        if ($lastLetter !== '') {
            $html .= "  </ul>";
        }
        return $html;
    }

    private function list_of_tags_by_count() {
        $tags = get_tags(array(
            'taxonomy' => 'post_tag',
            'orderby' => 'count',
            'order'   => 'DESC'));

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

        $html .= '  <h2 class="post_tags">Tags by Popularity</h2>';
        $html .= $this->list_of_tags_by_count();

        $html .= '  <h2 class="post_tags">Tags by Name</h2>';
        $html .= $this->list_of_tags_by_name();

        $html .= '</div>';
        echo $html;
    }

}

$aitg_blog_tags = new AITG_BlogTags();

?>

  <div class="flex-row">
    <div class="left-column">
    </div>
    <main class="content">
    	<?php do_action( 'basic_main_content_inner_begin' ); ?>

        <h1><?php the_title(); ?></h1>

        <?php $aitg_blog_tags->show_tags(); ?>

    	<?php do_action( 'basic_main_content_inner_end' ); ?>
    </main>
    <div class="right-column">
      <?php get_sidebar(); ?>
    </div>
  </div>

	<!-- END #content -->

<?php get_footer(); ?>
