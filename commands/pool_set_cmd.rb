module AresMUSH
  module Pools
    class PoolSetCmd
      include CommandHandler
      
      attr_accessor :name, :pool, :reason

      def parse_args
        # Admin version
        if (Pools.can_manage_pools?(enactor)) && (cmd.args =~ /\//)
          args = cmd.parse_args(ArgParser.arg1_equals_arg2_slash_arg3)
          self.name = titlecase_arg(args.arg1)
          self.pool = integer_arg(args.arg2)
          self.reason = titlecase_arg(args.arg3)
        else
          args = cmd.parse_args(ArgParser.arg1_equals_arg2)
          self.name = enactor_name
          self.pool = integer_arg(args.arg1)
          self.reason = titlecase_arg(args.arg2)
        end
     end

      def required_args
        [ self.name, self.pool, self.reason ]
      end
        
      def check_pools
        return t('pools.pool_empty') if enactor.pool < Global.read_config("pools", "min_pool")
        return t('pools.pool_full') if enactor.pool > Global.read_config("pools", "max_pool")
        return nil
      end


      def handle
        ClassTargetFinder.with_a_character(self.name, client, enactor) do |model|
          model.set_pool(self.pool)
          Global.logger.info "Pool Points set to #{self.pool} by #{enactor_name} to #{model.name} for #{self.reason}"
          scene = enactor_room.scene
          pool_name =  Global.read_config("pools", "pool_name_plural")

          message = t('pools.pool_set', :name => model.name, :pool => self.pool, :reason => self.reason, :pool_name => pool_name)
         
          if (scene)
            scene.room.emit_ooc message
            Scenes.add_to_scene(scene, message)
          else
            enactor_room.emit_ooc message
          end

      end
    end
  end
end
end