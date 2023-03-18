module AresMUSH
    module Pools
      class ShowPoolRequestHandler
        def handle(request)
          scene = Scene[request.args[:scene_id]]
          enactor = request.enactor
          sender_name = request.args[:sender]
          
          request.log_request
          
          error = Website.check_login(request)
          return error if error
          
          if (!scene)
            return { error: t('webportal.not_found') }
          end
          
          sender = Character.named(sender_name)
          if (!sender)
            return { error: t('webportal.not_found') }
          end
          
          if (!AresCentral.is_alt?(sender, enactor))
            return { error: t('dispatcher.not_allowed') }
          end
          
          if (!Scenes.can_read_scene?(enactor, scene))
            return { error: t('scenes.access_not_allowed') }
          end
          
          if (scene.completed)
            return { error: t('scenes.scene_already_completed') }
          end
          
          Pools.show_pool(sender, sender_name, scene)
         
          {
        
          }
        end
      end
    end
  end