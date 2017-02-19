---
layout: default
title: Quick Search for Bootstrap
name: Quick Search
description: Simple script to search strings within collection of elements. Useful for prototyping, when you don't have backend funcionality implemented, or for production, when you require ultra simple searching solution.
---

### Quick Search basics

You can use Quick Search purely through the markup API without writing a single line of JavaScript (just like Bootstrap does it). Add `data-input="quick-search"` attribute to a text input element, which initiates Quick Search via data API.

Then you must specify a target collection. Use `data-search-target` attribute and make sure it is pointing to a collection of elements, f.e. table rows, list items etc.

~~~html
<input data-input="quick-search" data-search-target="#searchable-table tbody > tr" name="quick-search">
~~~

### Searchable Table

The more data you want to show, the more you need some way of filtering. This plugin features:

<div class="sw-example">
  <div class="sw-panel">
    <div class="form-group">
      <!-- data-input="quick-search" -->
      <input class="form-control" data-input="quick-search" data-search-target="#searchable tbody > tr" placeholder="search for keyword..." name="quick-search-2" data-noresult-text="No results for given keyword...">

      <span class="glyphicon glyphicon-remove-circle form-control-feedback form-action-clear" aria-hidden="true"></span>
    </div>
  </div>

  <table id="searchable" class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Occupation</th>
        <th>Nationality</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Martin Freeman</td>
        <td>Actor</td>
        <td>United Kingdom</td>
        <td>32</td>
      </tr>

      <tr>
        <td>Dave Lister</td>
        <td>Technician</td>
        <td>United Kingdom</td>
        <td>26</td>
      </tr>

      <tr>
        <td>Martin Staněk</td>
        <td>Webdesigner</td>
        <td>Czech Republic</td>
        <td>29</td>
      </tr>

      <tr>
        <td>Nikola Tesla</td>
        <td>Genius</td>
        <td>Austrian Empire</td>
        <td>87</td>
      </tr>

      <tr>
        <td>James Bond</td>
        <td>Ornithologist</td>
        <td>American</td>
        <td>89</td>
      </tr>

      <tr>
        <td>Richard Feynman</td>
        <td>Theoretical physics</td>
        <td>American</td>
        <td>69</td>
      </tr>
    </tbody>
  </table>
</div>

~~~html
<div class="form-group">
<input data-input="quick-search" data-search-target="#searchable-table tbody > tr" name="quick-search">
<span class="glyphicon glyphicon-remove-circle form-control-feedback form-action-clear" aria-hidden="true"></span>
</div>

<table id="searchable-table">
<thead>
  <tr>
    <th>Name</th>
    <th>Occupation</th>
    <th>Nationality</th>
    <th>Age</th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>...</td>
    <td>...</td>
    <td>...</td>
    <td>...</td>
  </tr>
</tbody>
</table>
~~~

### Dropdown menu

Dropdown menus are not suitable for many list items. Easiest way to improve user experience, is to add simple filtering:

~~~html
<input data-input="quick-search" data-search-target="#list-of-states > li" name="quick-search">
~~~

<div class="sw-example">
  <div class="btn-group dropdown sw-open" style="margin-right:20px">
    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      Very long menu
      <span class="caret"></span>
    </button>

    <div class="dropdown-container">

      <div class="dropdown-toolbar">
        <div class="form-group">
          <input class="form-control" data-input="quick-search" data-search-target="#list-of-states > li" placeholder="search for keyword..." name="quick-search-2" data-noresult-text="No results for given keyword...">
          <span class="glyphicon glyphicon-remove-circle form-control-feedback form-action-clear" aria-hidden="true"></span>
        </div>
      </div><!-- /dropdown-toolbar -->

      <div class="dropdown-divider"></div>

      <ul id="list-of-states" class="dropdown-menu">
        <li><a href="#">Alabama </a></li>
        <li><a href="#">Alaska </a></li>
        <li><a href="#">Arizona </a></li>
        <li><a href="#">Arkansas </a></li>
        <li><a href="#">California </a></li>
        <li><a href="#">Colorado </a></li>
        <li><a href="#">Connecticut </a></li>
        <li><a href="#">Delaware </a></li>
        <li><a href="#">Florida </a></li>
        <li><a href="#">Georgia </a></li>
        <li><a href="#">Hawaii </a></li>
        <li><a href="#">Idaho </a></li>
        <li><a href="#">Illinois Indiana </a></li>
        <li><a href="#">Iowa </a></li>
        <li><a href="#">Kansas </a></li>
        <li><a href="#">Kentucky </a></li>
        <li><a href="#">Louisiana </a></li>
        <li><a href="#">Maine </a></li>
        <li><a href="#">Maryland </a></li>
        <li><a href="#">Massachusetts </a></li>
        <li><a href="#">Michigan </a></li>
        <li><a href="#">Minnesota </a></li>
        <li><a href="#">Mississippi </a></li>
        <li><a href="#">Missouri </a></li>
        <li><a href="#">Montana Nebraska </a></li>
        <li><a href="#">Nevada </a></li>
        <li><a href="#">New Hampshire </a></li>
        <li><a href="#">New Jersey </a></li>
        <li><a href="#">New Mexico </a></li>
        <li><a href="#">New York </a></li>
        <li><a href="#">North Carolina </a></li>
        <li><a href="#">North Dakota </a></li>
        <li><a href="#">Ohio </a></li>
        <li><a href="#">Oklahoma </a></li>
        <li><a href="#">Oregon </a></li>
        <li><a href="#">Pennsylvania Rhode Island </a></li>
        <li><a href="#">South Carolina </a></li>
        <li><a href="#">South Dakota </a></li>
        <li><a href="#">Tennessee </a></li>
        <li><a href="#">Texas </a></li>
        <li><a href="#">Utah </a></li>
        <li><a href="#">Vermont </a></li>
        <li><a href="#">Virginia </a></li>
        <li><a href="#">Washington </a></li>
        <li><a href="#">West Virginia </a></li>
        <li><a href="#">Wisconsin </a></li>
        <li><a href="#">Wyoming</a></li>
      </ul>

    </div><!-- /dropdown-container -->
  </div><!-- /dropdown -->
</div>

### Quick Search Overview

This table gives you a quick overview of elements and variables.

<div class="table-responsive sw-table">
  <table class="table table-bordered">
    <thead>
     <tr>
       <th style="width: 100px">Name</th>
       <th style="width: 200px">Class</th>
       <th>Usage</th>
     </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Clear Icon</strong></td>
        <td><code>.form-action-clear</code></td>
        <td>
          <p>Extension of Bootstrap's feedback icons. Clears the text input field.</p>

          <strong>Variables:</strong>
          <ul>
            <li><code>@feedback-action-color: @gray-light;</code><br><span class="text-muted">Color of the clear icon</span></li>
            <li><code>@feedback-action-hover-color: @text-color;</code><br><span class="text-muted">Hover color of the clear icon.</span></li>
          </ul>
        </td>
      </tr>
   </tbody>
  </table>
</div>
