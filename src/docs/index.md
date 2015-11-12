---
layout: default
title: Quick search for Bootstrap
name: Introduction
description: Simple library for searching any collection of elements. Useful for prototyping, when you don't have backend funcionality implemented, or for production, when you require ultra simple searching solution.
---

## Code

### Data attributes

You can use Quick Search purely through the markup API without writing a single line of JavaScript. This is based on Twitter Bootstrap's conventions and should be your first consideration when using a plugin.

Add `data-input="quick-search"` attribute to a text input element, which initiates Quick Search via data API.

Then you must specify a target collection. Use `data-search-target` attribute and make sure it is pointing to a collection of elements, f.e. table rows, list items etc. The plugin searches for the text value within elements of the specified collection.

{% example html %}
<input data-input="quick-search" data-search-target="#searchable-table tbody > tr" name="quick-search">
{% endexample %}

### JavaScript

You don't have to use data attributes, Quick Search can be also instantiated by JavaScript, just like ordinary jQuery plugin:

{% highlight js %}
$('.js-quick-search').quickSearch()
{% endhighlight %}

This plugin offers a few options, so it can be used without Twitter Bootstrap framework.


## Example

### Table

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

</div><!-- /sw-example -->

{% example html %}
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
{% endexample %}


