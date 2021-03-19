  <!-- START footer -->

  <footer>
    <div>
      <ul>
        <li><a href="https://www.disability.illinois.edu">Disability Resources and Educational Services</a></li>
        <li><a href="https://ahs.illinois.edu">College of Applied Health Sciences</a></li>
        <li><a href="https://illinois.edu">University of Illinois at Urbana-Champaign</a></li>
      </ul>
    </div>
    <div>
      <ul>
        <li><a href="https://itaccessibility.illinois.edu/">IT Accessibility @ Illinois</a></li>
        <li><a href="https://cam.illinois.edu/policies/hr-86/">IT Accessibility Policy</a></li>
        <li><a href="https://diversity.illinois.edu/">Office of Diversity, Equity &amp; Inclusion</a></li>
      </ul>
    </div>
    <div>
      <ul>
        <li><a href="https://illinois.edu/resources/website/accessibility.html">Accessibility Statement</a></li>
        <li><a href="/about/">About AITG</a></li>
        <li><a href="/contact/">Contact Us</a></li>
      </ul>
    </div>
  </footer>

  <?php wp_footer(); ?>

  <!-- END footer -->

  <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/DisclosureMenu.js"></script>
  <script src="https://cdn.disability.illinois.edu/skipto.min.js"></script>
  <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/AdjustEventDates.js"></script>
  <script>
      var SkipToConfig =  {
          'settings': {
              'skipTo': {
                  landmarks: 'main, [role="main"], [role="search"], nav',
                  headings: 'main h1, main h2',
                  colorTheme: 'illinois',
                  customClass: 'aitg'
              }
          }
      };
  </script>
</body>
</html>
