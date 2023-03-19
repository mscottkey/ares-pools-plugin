module AresMUSH
  module Pools
    class PoolDesperateCmd
      include CommandHandler
      
      attr_accessor :name

      def parse_args
          self.name = !cmd.args ? enactor_name : titlecase_arg(cmd.args)          
      end
        
      def check_can_show
        return nil if enactor_name == self.name
        return nil if Pools.can_manage_pools?(enactor)
        return t('dispatcher.not_allowed')
      end

      def check_pools
        return t('pools.pool_empty') if enactor.pool < Global.read_config("pools", "min_pool")
        return t('pools.pool_empty', :pool_name => Global.read_cofig("pools", "pool_name_plural")) if self.pool <= 0
        return nil
      end
      
      def handle
        ClassTargetFinder.with_a_character(self.name, client, enactor) do |model|
          if model.pool < 1
             message = t('pools.pool_empty', :pool_name_plural => Global.read_config("pools", "pool_name_plural") )
             client.emit_ooc message
          else
             Pools.pool_desperate(model, enactor, enactor_room.scene)
          end
      end
    end
  end
end