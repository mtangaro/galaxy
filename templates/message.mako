<%!
    def inherit(context):
        if context.get('use_panels'):
            if context.get('webapp'):
                app_name = context.get('webapp')
            elif context.get('app'):
                app_name = context.get('app').name
            else:
                app_name = 'galaxy'
            return '/webapps/%s/base_panels.mako' % app_name
        else:
            return '/base.mako'
%>
<%inherit file="${inherit(context)}"/>

<%namespace file="/refresh_frames.mako" import="handle_refresh_frames" />

<% _=n_ %>

<%def name="init()">
<%
    self.has_left_panel=False
    self.has_right_panel=False
    self.active_view=active_view
    self.message_box_visible=False
%>
</%def>

<%def name="javascripts()">
    ${parent.javascripts()}
    ${handle_refresh_frames()}
    <script type="text/javascript">
        if ( parent.handle_minwidth_hint )
        {
            parent.handle_minwidth_hint( -1 );
        }
    </script>
</%def>

##
## Override methods from base.mako and base_panels.mako
##

<%def name="center_panel()">
    ${render_msg( message, status )}
</%def>

<%def name="body()">
    ${render_msg( message, status )}
</%def>

## Render a message
<%def name="render_msg( msg, status='done' )">
    <% status = "success" if status == "done" else status %>
    <% status = "danger" if status == "error" else status %>
    <div class="mt-2 alert alert-${status}">${_(msg)}</div>
</%def>