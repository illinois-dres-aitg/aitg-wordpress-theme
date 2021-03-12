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
                    $html .= '    </ul>';
                }
                $html .= '    <h3 class="post-letter">' . ucwords($letter) . '</h3>';
                $html .= '    <ul class="post-tags">';
                $lastLetter = $letter;
            }
            if ($tag->count > 0) {
                $tag_link = get_tag_link( $tag->term_id );

                $html .= "      <li><a href='{$tag_link}' class='{$tag->slug}'>";
                $html .= "{$tag->name} ({$tag->count})</a></li>";
            }
        }

        if ($lastLetter !== '') {
            $html .= '    </ul>';
        }
        return $html;
    }

    private function list_of_tags_by_count() {
        $tags = get_tags(array(
            'taxonomy' => 'post_tag',
            'orderby' => 'count',
            'order'   => 'DESC'));

        $lastCount = 0;

        $html = '';

        foreach ( $tags as $tag ) {
            $count = $tag->count;
            if ($count > 0) {
                if ( $lastCount !== $count) {
                    if ($lastCount !== 0) {
                        $html .= '    </ul>';
                    }
                    if ($count > 1) {
                        $html .= '    <h3 class="post-letter">' . $count . ' Posts</h3>';
                    } else {
                        $html .= '    <h3 class="post-letter">1 Post</h3>';
                    }
                    $html .= '    <ul class="post-tags">';
                    $lastCount = $count;
                }
                $tag_link = get_tag_link( $tag->term_id );

                $html .= "      <li><a href='{$tag_link}' class='{$tag->slug}'>";
                $html .= "{$tag->name}</a></li>";
            } else {
                if ($lastCount !== 0) {
                    $html .= '    </ul>';
                }
                $lastCount = 0;
            }
        }

        if ($lastCount !== 0) {
            $html .= '    </ul>';
        }
        return $html;
    }

    public function show_tags() {
        $html = '<div class="post_tags">';

        $html .= '  <div role="tablist">';
        $html .= '    <div role="tab" aria-controls="id-tabpanel-name" id="id-tab-name">Name</div>';
        $html .= '    <div role="tab" aria-controls="id-tabpanel-pop" id="id-tab-pop">Popularity</div>';
        $html .= '  </div>';


        $html .= '  <div role="tabpanel" aria-labelledby="id-tab-pop" id="id-tabpanel-pop">';
        $html .= '    <h2 class="post_tags">Tags by Popularity</h2>';
        $html .= $this->list_of_tags_by_count();
        $html .= '  </div>';

        $html .= '  <div role="tabpanel" aria-labelledby="id-tab-name" id="id-tabpanel-name">';
        $html .= '    <h2 class="post_tags">Tags by Name</h2>';
        $html .= $this->list_of_tags_by_name();
        $html .= '  </div>';

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
  <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/Tablist.js"></script>
	<!-- END #content -->

<?php get_footer(); ?>
