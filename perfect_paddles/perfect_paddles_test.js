'use strict';

const Assert = require('assert');
const Request = require('sync-request');
const Chai = require('chai');
const JSDom = require('mocha-jsdom');

const expect = Chai.expect;


describe('Perfect Paddles', () => {
  
  describe('HTML', () => {

    let $;
    JSDom();

    let htmlBody = null; 
    before(() => {
      $ = require('jquery');

      Assert.ok(process.env.HTML, 'No HTML path included');
      
      const response = Request('GET', process.env.HTML);
      document.body.innerHTML = response.getBody('utf8');
    });

    it('Required meta tag <meta charset="utf-8"> is included', () => {

      Assert.ok($('meta[charset]').attr('charset'));
    });
    
    it('has paragraphs', () => {

      Assert.ok($('p').length);
    });

    it('does not use <br /> tags to create whitespace', () => {
      
      Assert.equal($('br').length, 0, 'Whitespace should be created with CSS margins, padding, etc. rather than <br /> tags');
    });

    it('has only one <h1>', () => {
      
      Assert.equal($('h1').length, 1);
    });

    it('has at least one list', () => {

      const listCount = $('ul, ol').length;
      Assert.ok(listCount > 0, 'No <ul> or <ol> present.');
    });

    it('info@perfectpaddles.com link is a valid mailto link', () => {
      
      const email = 'info@perfectpaddles.com';
      const mailLink = $('a[href*="mailto:"]');

      expect(mailLink.attr('href')).to.contain(email);
      expect(mailLink.text()).to.contain(email);
    });

    it('social media links exist and link to the social media networks', () => {
    });

    it('incorporates a list-based navigation', () => {

      const menuLinks = $('ul').first().find('li a');
      
      Assert.equal(menuLinks.length, 3, 'does not contain 3 links');

      menuLinks.each((i, link) => {
        const linkText = $(link).text().toLowerCase().trim();

        Assert.ok(
          ['about', 'rentals', 'location'].indexOf(linkText) >= 0, 
          `Link ${linkText} not in the list.`
        );
      });
    });

  });

});