<?php $s = get_search_query(); ?>
    <div class="search-widget">
    	<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    		<input type="search" size="20" maxlength="128" class="search-field" placeholder="<?php esc_attr_e( 'Search...', 'unlimited' ); ?>" value=""
    		       name="s" title="<?php esc_attr_e( 'Search AITG Pages', 'unlimited' ); ?>"/>
        	<button type="submit" aria-label="Submit Query"></button>
    	</form>
    </div>