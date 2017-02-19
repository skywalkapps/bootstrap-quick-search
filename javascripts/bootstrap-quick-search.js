/* ========================================================================
 * Quick Search: bootstrap-quick-search.js v0.9.1
 * ========================================================================
 * Copyright 2015 Martin Stanek, Twitter: @koucik, Github: @skywalkapps
 * Licensed under MIT (https://github.com/skywalkapps/bootstrap-quick-search/blob/master/LICENSE)
 * ======================================================================== */


+function ($) { "use strict";

  // QUICK SEARCH CLASS DEFINITION
  // -----------------------
  var quickSearchElement = '[data-input="quick-search"]'

  var QuickSearch = function (element, options) {
    $(element).on('input.bs.quickSearch', options, this.search)
    $(element).on('keyup.bs.quickSearch', options, this.clear)
    $(options.clearSelector).on('input.bs.quickSearch', options, this.clear)
  }

  // Default configuration
  QuickSearch.DEFAULTS = {
    clearSelector: '.form-action-clear',
    activeClass: 'has-feedback'
  }

  QuickSearch.VERSION = '0.1'


  QuickSearch.prototype.search = function (e) {
    var self = $(e.target)
    var itemsSelector = self.data('search-target')
    var val = self.val().toLowerCase()

    // Indicate that input search input is filled
    if (val.length > 0) self.parent().addClass(e.data.activeClass)

    $(itemsSelector).each(function(){
      var text = $(this).text().toLowerCase()

      if (text.indexOf(val) !== -1) {
        $(this).removeClass('hidden')
      }
      else {
        $(this).addClass('hidden')
      }
    })

  }


  QuickSearch.prototype.clear = function (e) {
    var input = $(e.target).prev()

    // Stop event propagation (input can be inside dropdown etc.)
    e.stopPropagation()

    // Reset
    if (e.keyCode == 27) input = $(e.target)

    // Clear the input field
    input.val('')

    // Remove hidden from items
    $(input.data('search-target')).removeClass('hidden')

    // Remove active class
    input.parent().removeClass(e.data.activeClass)
  }

  // QUICK SEARCH PLUGIN DEFINITION
  // -----------------------

  var old = $.fn.quickSearch

  $.fn.quickSearch = function (option) {
    return this.each(function () {
      var self = $(this),
          options = $.extend({}, QuickSearch.DEFAULTS, self.data(), typeof option == 'object' && option),
          data = self.data('quickSearch');

      if (!data) self.data('quickSearch', (data = new QuickSearch(this, options)))
    })
  }

  $.fn.quickSearch.Constructor = QuickSearch


  // QUICK SEARCH NO CONFLICT
  // -----------------

  $.fn.quickSearch.noConflict = function () {
    $.fn.quickSearch = old
    return this
  }

  // APPLY TO STANDARD QUICK SEARCH ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.quickSearch.data-api', QuickSearch.DEFAULTS.clearSelector, QuickSearch.DEFAULTS, QuickSearch.prototype.clear)
    .on('input.bs.quickSearch.data-api', quickSearchElement, QuickSearch.DEFAULTS, QuickSearch.prototype.search)
    .on('keyup.bs.quickSearch.data-api', quickSearchElement, QuickSearch.DEFAULTS, QuickSearch.prototype.clear)


}(window.jQuery);
