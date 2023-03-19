module AresMUSH
  module Pools
    class PoolSpendCmd
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
        return t('pools.pool_no_zero') if self.pool == 0
        return t('pools.pool_empty', :pool_name => Global.read_cofig("pools", "pool_name_plural")) if self.pool <= 0
        return nil
      end

      def handle
        ClassTargetFinder.with_a_character(self.name, client, enactor) do |model|
          if model.pool < 1
             message = t('pools.pool_empty', :pool_name_plural => Global.read_config("pools", "pool_name_plural") )
             client.emit_ooc message
          else
             Pools.pool_spend(model, self.pool, self.reason, enactor_room.scene)
          end
      end
    end
  end
end