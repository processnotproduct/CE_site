/**
 * Nav Init
 */
function nav_init()
{
    // Properties
    var $this       = "#nav",
        $so_btn     = "#nav .so-buttons",
        active      = false,
        tl_btn;

    // Events
    $(window).on("app_init", init);
    $(window).on("app_resize", resize);
    $(window).on("app_scroll_instant", scroll_instant);

    /**
     * Init
     * @param $e
     */
    function init($e)
    {
        // Set Positions
        $($this).css({top:"-"+$($this).height()+"px"});

        // Set Shadows
        TweenMax.set($($this), {css:{boxShadow:shadow_0}});

        // Tween Buttons
        tl_btn = new TimelineMax({paused:true});
        $.each( $($this+" .buttons").children("a"), function($i, $btn)
        {
            tl_btn.add( TweenMax.fromTo( $btn, .3, { css:{autoAlpha:0, scale:0} }, { css:{autoAlpha:1, scale:1}, ease:ea_o }), $i*0.05);
        });

        // So Buttons
        tl_btn.add( TweenMax.fromTo( $($so_btn), .3, { css:{autoAlpha:0, scale:0} }, { css:{autoAlpha:1, scale:1}, ease:ea_o }), 4*0.05);

        // Init User Interface
        init_ui();
    }

    /**
     * Init User Interface
     */
    function init_ui()
    {
        // Mouse Events
        $($this).mouseenter(function()
        {
            if(!active) return false;
            tl_btn.play();
        });
        $($this).mouseleave(function()
        {
            if(!active) return false;
            tl_btn.reverse();
        });
    }

    /**
     * Resize
     * @param $e
     */
    function resize($e)
    {
        if(active)
        {
            TweenMax.set( $($this), { css:{top:"-0px"} });
        }
        else
        {
            TweenMax.set( $($this), { css:{top:"-"+$($this).height()+"px"} });
        }
    }

    /**
     * Scroll Instant
     * @param $e
     */
    function scroll_instant($e)
    {
        if($e.scroll_top < 100 && active == true)
        {
            active = false;
            TweenMax.to( $($this), .5, { css:{top:"-"+$($this).height()+"px"}, ease:ea_io });
            if(tl_btn) tl_btn.reverse();
        }
        else if($e.scroll_top > 100 && active == false)
        {
            active = true;
            TweenMax.to( $($this), .5, { css:{top:"-0px"}, ease:ea_io });
        }
    }
}
nav_init();