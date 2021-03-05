<?php
$categories = the_category(', ');
$hasCategories = strpos($categories, 'Uncategorized') === false;

$tags = the_tags();
$hasTags = strpos($tags, 'Tags') !== false;
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h1 class="entry-title">
      <?php the_title(); ?>
    </h1>

    <div class="date">
        <span>Date:</span> <?php the_date(); ?>
    </div>

    <div class="author">
        <span>Author:</span> <?php the_author(); ?>
    </div>

    <?php the_content(); ?>

    <?php if ($hasCategories) { ?>
    <div class="categories">
        Category: <?php echo $categories ?>
    </div>
    <?php } ?>

    <?php if ($hasTags) { ?>
    <div class="tags">
        <?php echo $tags ?>
    </div>
    <?php } ?>
</article>
