import { EventEmitter, EventsTuple } from "~/create-store/event-emitter"
import { RemoveDollarSignProps } from "~/types"
import { StoreConstructorConfig } from "."
import { TransitionsStore } from "./transitions-store"
import { SubjectType } from "~/Subject"
import { ErrorsStore } from "~/create-store/errors-store"

export type TODO = any

export type Dispatch<TState, TActions extends BaseAction<TState>> = (
  action: TActions & BaseAction<TState>
) => void

export type HistoryExtension<TState> = {
  history: Array<TState>
  historyRedo: Array<TState>
}

type SettersRegistry<TState> = Record<string, Array<(state: TState) => Partial<TState>>>

export type GenericStoreValues<TState, TEvents extends EventsTuple = EventsTuple> = {
  errors: ErrorsStore
  events: EventEmitter<TEvents>
  state: TState & BaseState
  errorHandlers: Set<StoreErrorHandler>
  settersRegistry: SettersRegistry<TState>
} & TransitionsExtension &
  HistoryExtension<TState>

export type GenericStoreMethods<
  TState,
  TActions extends BaseAction<TState>,
  TEvents extends EventsTuple
> = {
  getState(): TState
  dispatch: Dispatch<TState, TActions>
  setState(newState: Partial<TState>): void
  registerSet: InnerReducerSet<TState>
  createSetScheduler(
    newState: TState & Partial<TState>,
    mergeType: "reducer" | "set",
    transition: any[] | null | undefined
  ): ReducerSet<TState>
  registerErrorHandler(handler: StoreErrorHandler): () => void
  rerender(): void
  handleError: StoreErrorHandler
  undo(): void
  redo(): void
  rebuild(): () => SomeStore<TState, TActions, TEvents>
}

export type SomeStore<
  TState,
  TActions extends BaseAction<TState>,
  TEvents extends EventsTuple
> = GenericStoreValues<TState, TEvents> &
  GenericStoreMethods<TState, TActions, TEvents> &
  SubjectType

export type DefaultActions =
  | {
      type: string
      transition?: any[]
      onTransitionEnd?: (state: TODO) => void
    }
  | {
      type: "$$lazy-value"
      transition: any[]
      transitionFn: (transition: any[], actor: AsyncActor<any, any>) => Promise<any>
      onSuccess: (value: any, actor: AsyncActor<any, any>) => void
    }

export type BaseAction<TState> = {
  type: string
  onTransitionEnd?: (state: TState) => void
  transition?: any[]
} & Record<string, any>

type SetterOrPartialState<TState> = Setter<TState> | Partial<TState>

export type AsyncActor<TState, TActions extends BaseAction<TState>> = {
  set: (setterOrPartialState: SetterOrPartialState<TState>) => void
  dispatch(action: TActions | DefaultActions): void
  async: Async<TState, TActions>
}

export const isSetter = <TState>(
  setterOrPartialState: SetterOrPartialState<TState>
): setterOrPartialState is Setter<TState> => {
  return typeof setterOrPartialState === "function"
}

export function newSetter<TState>(newPartialState: Partial<TState>): Setter<TState> {
  return () => newPartialState
}

export type AsyncPromiseProps = {
  signal: AbortSignal
}

export type PromiseResult<T, TState, TActions extends BaseAction<TState>> = {
  onSuccess: (callback: (value: T, actor: AsyncActor<TState, TActions>) => void) => void
}

export type Async<TState, TActions extends BaseAction<TState>> = {
  promise<T>(promise: (props: AsyncPromiseProps) => Promise<T>): PromiseResult<T, TState, TActions>
  timer(callback: (actor: AsyncActor<TState, TActions>) => void, time?: number): void
}

export type Diff<TState> = (keys: (keyof TState)[]) => boolean

export type TransitionsExtension = {
  transitions: TransitionsStore
}

export type BaseState = {
  currentTransition: any[] | null
}

export type Setter<TState> = (state: TState) => Partial<TState>

export type ReducerSet<TState> = (setterOrPartialState: SetterOrPartialState<TState>) => void
export type InnerReducerSet<TState> = (
  setterOrPartialStateList: SetterOrPartialState<TState>,
  state: TState,
  transition: any[] | null | undefined,
  mergeType: "reducer" | "set"
) => void

export type StoreErrorHandler = (error: unknown, transition: any[]) => void

export type SomeStoreGeneric = SomeStore<any, any, any>

export type StoreInstantiator<
  TInitialProps,
  TState,
  TActions extends BaseAction<TState>,
  TEvents extends EventsTuple
> = (
  initialProps: RemoveDollarSignProps<TInitialProps>,
  config?: StoreConstructorConfig
) => SomeStore<TState, TActions, TEvents>

export type StoreInstantiatorGeneric = StoreInstantiator<any, any, any, any>

export type ExtractEvents<T> = T extends SomeStore<any, any, infer E> ? E : never
export type ExtractActions<T> = T extends SomeStore<any, infer A, any> ? A : never
