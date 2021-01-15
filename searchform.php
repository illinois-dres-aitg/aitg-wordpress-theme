<?php $s = get_search_query(); ?>
    <div class="search-widget">
    	<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    		<input type="search" size="20" maxlength="128" class="search-field" placeholder="<?php esc_attr_e( 'SEARCH', 'unlimited' ); ?>" value=""
    		       name="s" title="<?php esc_attr_e( 'Search Pages', 'unlimited' ); ?>"/>
              <button type="submit" alt="Submit Query">
                <svg width="21px" height="21px" viewBox="0 0 241 243" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>Search Icon: Magnifying Glass</title>
                  <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Group" transform="translate(19.000000, 19.000000)">
                      <circle id="Oval" stroke="currentColor" stroke-width="30" cx="75.5" cy="75.5" r="75.5"></circle>
                      <rect id="Rectangle" fill="currentColor" transform="translate(166.414214, 169.414214) rotate(45.000000) translate(-166.414214, -169.414214) " x="106.414214" y="149.414214" width="120" height="40" rx="16"></rect>
                    </g>
                  </g>
                </svg>
            </button>
    	</form>
    </div>
