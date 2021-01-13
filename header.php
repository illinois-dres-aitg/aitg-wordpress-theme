<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" media="all" href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,600,700" />
  <link rel="icon" type="image/png" href="<?php echo esc_url( get_template_directory_uri() ); ?>/images/favicon.ico">
  <link rel="stylesheet" media="all" href="<?php echo esc_url( get_template_directory_uri() ); ?>/style.css"/>
  <?php wp_head(); ?>

</head>
<body>

  <header>
    <div class="banner">
      <div class="banner-row-1">
        <div class="banner-logo">
          <a href="https://illinois.edu">
            <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/illinois-wordmark.png" alt="Illinois">
          </a>
        </div>
        <div class="banner-search">
    	    <?php get_search_form(); ?>
        </div>
      </div>
      <div class="banner-row-2">
        <div class="banner-name">
          <a href="<?php echo esc_url( get_site_url() ); ?>">
            <?php echo get_bloginfo('name')?>
          </a>
        </div>
        <?php wp_nav_menu(
    		array(
    			'menu'  => 'Primary',
    			'container'       => 'nav',
    			'container_class' => 'banner-menu',
    			'menu_id'         => 'banner-menu',
    			'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>'
    		) ); ?>
    </div>
  </header>

  <!-- END header -->


