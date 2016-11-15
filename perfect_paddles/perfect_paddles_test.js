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

    it('Required viewport meta tag is included', () => {

      const viewport = $('meta[name="viewport"]').attr('content');

      expect(viewport).to.contain('width=device-width');
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

    it('includes a CSS reset', () => {
      
      Assert.ok($('link[href*="reset.css"]').length);
    });

    it('social media links exist and link to the social media networks', () => {

      Assert.equal($('a[href*="facebook"]').length, 1, 'Facebook link not found');
      Assert.equal($('a[href*="instagram"]').length, 1, 'Instagram link not found');
      Assert.equal($('a[href*="twitter"]').length, 1, 'Twitter link not found');
      Assert.equal($('a[href*="pinterest"]').length, 1, 'Pinterest link not found');
      Assert.equal($('a[href*="google.com"]').length, 1, 'Google+ link not found');
    });

    it('social media links use FontAwesome', () => {
      
      Assert.equal($('.fa-facebook').length, 1, 'Facebook icon not found');
      Assert.equal($('.fa-instagram').length, 1, 'Instagram icon not found');
      Assert.equal($('.fa-twitter').length, 1, 'Twitter icon not found');
      Assert.equal($('.fa-pinterest').length, 1, 'Pinterest icon not found');
      Assert.equal($('.fa-google-plus').length, 1, 'Google+ icon not found');
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

    it('embeds Google Maps', () => {

      Assert.equal($('iframe[src*="google.com/maps"]').length, 1);
    });

  });


  describe('CSS', () => {

    let cssString = null;

    before(() => {
      
      const response = Request('GET', process.env.CSS);
      cssString = response.getBody('utf8');
    });

    it('uses the background property', () => {

      expect(cssString).to.contain('background');
    });
    
    it('alters visual display of text', () => {

      ['font-family', 'color'].forEach((style) => {
        
        expect(cssString).to.contain(style);
      });
    });

    it('uses @font-face', () => {

      expect(cssString).to.contain('@font-face');
    });
    
    it('uses some CSS3 properties', () => {

      const propsNotIncl = [];
      const css3props = ['border-radius', 'box-shadow', 'text-shadow', 'linear-gradient'];

      css3props.forEach((prop) => {

        const re = new RegExp(prop);

        if (!cssString.match(re)) {
          propsNotIncl.push(prop);
        }
      });

      const acceptableThreshold = 3;
      Assert.ok(propsNotIncl.length < acceptableThreshold, `Not enough CSS3 props: ${propsNotIncl.join(', ')}`);
    });

    it('has required media queries for mobile-first responsive design', () => {

      try {
        expect(cssString).to.contain('min-width: 600px');
        expect(cssString).to.contain('min-width: 1140px');
      }
      catch (e) {
        // whitespace :(
        expect(cssString).to.contain('min-width:600px');
        expect(cssString).to.contain('min-width:1140px');
      }
    });

  });

});