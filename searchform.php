<?php $s = get_search_query(); ?>
    <div class="search-widget">
    	<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    		<input type="search" size="20" maxlength="128" class="search-field" placeholder="<?php esc_attr_e( 'Search...', 'unlimited' ); ?>" value=""
    		       name="s" title="<?php esc_attr_e( 'Search AITG Pages', 'unlimited' ); ?>"/>
              <button type="submit" alt="Submit Query">
                <svg width="20px" height="20px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>Search Icon: Magnifying Glass</title>
                  <desc>Created with Sketch</desc>
                  <defs></defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Letter" transform="translate(-110.000000, -318.000000)" stroke="currentColor" stroke-width="36">
                      <path d="M200,545 C152.503512,545 114,506.496488 114,459 C114,411.503512 152.503512,373 200,373 C247.496488,373 286,411.503512 286,459 C286,506.496488 247.496488,545 200,545 Z M286,460 C286,459.447715 286.45476,459 287.00953,459 L386.99047,459 C387.548018,459 388,459.443865 388,460 C388,460.552285 387.54524,461 386.99047,461 L287.00953,461 C286.451982,461 286,460.556135 286,460 Z" id="Combined-Shape" transform="translate(251.000000, 459.000000) rotate(45.000000) translate(-251.000000, -459.000000) "></path>
                    </g>
                  </g>
              </svg>
            </button>
    	</form>
    </div>