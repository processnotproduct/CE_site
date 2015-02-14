/**
 * Contact Init
 */
function contact_init()
{
    // Properties
    var $this       = "#contact",
        $holder     = "#contact .holder",
        $text       = "#contact .holder .text",
        tl;

    // Events
    $(window).on("app_init", init);
    $(window).on("app_resize", resize);
    $(window).on("app_scroll", scroll);

    /**
     * Init
     * @param $e
     */
    function init($e)
    {
        // Set Shadows
        TweenMax.set($($holder), {css:{boxShadow:shadow_0}});

        // Generate Tweens
        generate_tweens();
    }

    /**
     * Generate Tweens
     */
    function generate_tweens()
    {
        var h1 = $($text+" h1");
        var h3 = $($text+" h3");
        var line = $($text+" .line");

        tl = new TimelineMax({paused:true});
        tl.add( TweenMax.fromTo( h1,    .5, {css:{autoAlpha:0, scale:.95, rotationX:50}}, {css:{autoAlpha:1, scale:1, rotationX:0}, ease:ea_o}), 0);
        tl.add( TweenMax.fromTo( h3,    .5, {css:{autoAlpha:0, scale:.95, rotationX:50}}, {css:{autoAlpha:1, scale:1, rotationX:0}, ease:ea_o}), .1);
        tl.add( TweenMax.fromTo( line,  .5, {css:{autoAlpha:0, scale:.95, rotationX:50}}, {css:{autoAlpha:1, scale:1, rotationX:0}, ease:ea_o}), .2);
    }

    /**
     * Resize
     * @param $e
     */
    function resize($e)
    {
        // Footer
        var footer_h = $("footer").height();

        // Contact
        $($this).height($e.h-footer_h);
        $($this).css({marginBottom:footer_h+"px"});

        // Holder
        var holder = $($holder);
        holder.height($e.h-footer_h);

        // Text
        var text = $($text);
        var top = (holder.height() - text.height()) * .5 + 35;
        text.css({top:top+"px"});
    }

    /**
     * Scroll
     * @param $e
     */
    function scroll($e)
    {
        if($e.section_in == "contact")
        {
            tl.play();
        }
        else if($e.section_out == "contact")
        {
            tl.reverse();
        }
    }
}
contact_init();